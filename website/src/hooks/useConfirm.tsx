import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRootLayer } from '@/components/ui/rootLayer';
import { useCallback } from 'react';

export function useConfirm() {
  const add = useRootLayer((s) => s.addElement);
  return useCallback(
    ({
      title = 'Confirm',
      description = 'Please confirm your action',
      onContinue,
    }: {
      title?: string;
      description?: string;
      onContinue: () => void;
    }) => {
      const dismiss = add(
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) dismiss();
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{description}</DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => dismiss()}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  dismiss();
                  onContinue();
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
    [add]
  );
}
